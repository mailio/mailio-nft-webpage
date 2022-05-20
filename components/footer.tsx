/* eslint-disable @next/next/no-img-element */
import { Box, Container, Grid, IconButton, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import { FC } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Logo } from './logo';
import NextLink from 'next/link';

const footerSections = [
    {
        title: 'Use Mailio',
        links: [
            {
                title: 'Get your address',
                href: 'https://mail.io'
            },
            {
                title: 'Documentation',
                href: 'https://docs.mail.io'
            }
        ]
    },
    {
        title: 'Community',
        links: [
            {
                title: 'Discord',
                href: 'https://discord.gg/uzVbJA46E3'
            },
            {
                title: 'Youtube',
                href: 'https://www.youtube.com/channel/UCArt7H6WT0PpFo6---BGpeA'
            }
        ],
    },
    // {
    //     title: 'Developers',
    //     links: [
    //         {
    //             title: 'Get started',
    //             href: 'https://github.com/mailio'
    //         },
    //         {
    //             title: 'Documentation',
    //             href: ''
    //         },
    //         {
    //             title: 'Tutorials',
    //             href: '/tutorials'
    //         },
    //         {
    //             title: 'Learn by doing',
    //             href: '/learn-by-doing'
    //         },
    //         {
    //             title: 'Set up local environment',
    //             href: '/setup-local-environment'
    //         }
    //     ]
    // },
    {
        title: 'About mail.io',
        links: [
            {
                title: 'About',
                href: 'https://mail.io'
            },
            {
                title: 'Blog',
                href: 'https://igor.technology/tag/mailio/'
            },
            {
                title: 'GitHub',
                href: 'https://github.com/mailio',
            }
        ]
    },
];

export const Footer: FC = (props) => {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'background.mailioblack',
                    borderTopColor: 'divider',
                    borderTopStyle: 'solid',
                    borderTopWidth: 1,
                    pb: 6,
                    pt: {
                        md: 15,
                        xs: 6
                    }
                }}
                {...props}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item
                            xs={6}
                            md={6}
                        >
                            <Logo variant='white' />
                        </Grid>
                        <Grid item
                            xs={6}
                            md={6}
                            flexDirection="row"
                        >
                            <Grid
                                container
                                spacing={2}
                                justifyContent="flex-end"
                            >
                                <Grid
                                    item
                                    sm={1}
                                    md={1}
                                >
                                    <NextLink
                                        href="https://github.com/mailio"
                                        passHref
                                    >
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                            }}
                                        >
                                            <GitHubIcon
                                                fontSize="medium"
                                            />
                                        </IconButton>
                                    </NextLink>
                                </Grid>
                                <Grid
                                    item
                                    sm={1}
                                    md={1}
                                >
                                    <NextLink
                                        href="https://discord.gg/uzVbJA46E3"
                                        passHref
                                    >
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                                mt: '3px',
                                            }}
                                        >
                                            <img src="/images/discord.png" width="24px" height="24px" alt="discord" />
                                        </IconButton>
                                    </NextLink>
                                </Grid>
                            </Grid>
                        </Grid>
                        {footerSections.map((section, index) => (
                            <Grid
                                item
                                key={section.title}
                                md={3}
                                lg={3}
                                sm={3}
                                xs={12}
                            >
                                <Typography
                                    color="primary.contrastText"
                                    variant="overline"
                                >
                                    {section.title}
                                </Typography>
                                <List disablePadding>
                                    {section.links.map((link) => (
                                        <ListItem
                                            disableGutters
                                            key={link.title}
                                            sx={{
                                                pb: 0,
                                                pt: 0,
                                            }}
                                        >
                                            <ListItemText
                                                sx={{
                                                    m: 0,
                                                    textAlign: 'left',
                                                }}
                                                primary={(
                                                    <Link
                                                        href={link.href}
                                                        color="primary.contrastText"
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontSize: '0.975rem',
                                                        }}
                                                    >
                                                        {link.title}
                                                    </Link>
                                                )}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

            </Box >
        </>
    );
};