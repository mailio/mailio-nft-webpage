import { BatteryFullTwoTone } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';

interface AuthGuardProps {
    children: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = (props) => {

    const { children } = props;
    const router = useRouter();

    const { isAuthenticated } = useAuth();
    const [validated, setValidated] = useState<boolean>(false);

    useEffect(() => {
        console.log('is router ready?', router.isReady);
        if (!router.isReady) {
            return;
        }
        console.log('is authenticated?', isAuthenticated);
        if (!isAuthenticated) {
            router.push({
                pathname: '/admin',
                query: { returnUrl: router.asPath },
            })
        } else {
            setValidated(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    if (!validated) {
        // user not authenticated, therefor don't allow path to children
        return null;
    }

    return (
        <>
            {children}
        </>
    );
};