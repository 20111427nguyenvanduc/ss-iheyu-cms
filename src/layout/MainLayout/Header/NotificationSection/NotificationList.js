import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';

// assets
import IconBrandTelegram from '@mui/icons-material/Telegram';
import IconBuildingStore from '@mui/icons-material/Store';
import IconMailbox from '@mui/icons-material/Mail';
import IconPhoto from '@mui/icons-material/InsertPhoto';
const User1 = '/images/logo.png'

// style constant
const NavContainer = styled(List)(({ theme }) => ({
    width: '100%',
    maxWidth: '330px',
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '300px'
    }
}))
const ListAction = styled(ListItemSecondaryAction)(({ theme }) => ({
   top: '22px'
}))
const ActionText = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey[500]
}))

const ListChipError = styled(Chip)(({ theme }) => ({
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.orange.light,
    height: '24px',
    padding: '0 6px',
    marginRight: '5px'
}))
const ListChipWarning = styled(Chip)(({ theme }) => ({
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light,
    height: '24px',
    padding: '0 6px'
}))
const ListChipSuccess = styled(Avatar)(({ theme }) => ({
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    height: '24px',
    padding: '0 6px'
}))
const ListAvatarSuccess = styled(Avatar)(({ theme }) => ({
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    border: 'none',
    borderColor: theme.palette.success.main
}))
const ListAvatarPrimary = styled(Avatar)(({ theme }) => ({
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.light,
    border: 'none',
    borderColor: theme.palette.primary.main
}))
const UploadCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light
}))
const ItemAction = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    padding: '16px',
    '&:hover': {
        background: theme.palette.primary.light
    }
}))


// ===========================|| NOTIFICATION LIST ITEM ||=========================== //

const NotificationList = () => {
    return (
        <NavContainer>
            <ItemAction>
                <ListItem alignItems="center" sx={{padding: 0}}>
                    <ListItemAvatar>
                        <Avatar alt="John Doe" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
                    <ListAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <ActionText variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </ActionText>
                            </Grid>
                        </Grid>
                    </ListAction>
                </ListItem>
                <Grid container direction="column" sx={{paddingLeft: '56px'}}>
                    <Grid item xs={12} sx={{paddingBottom: '16px'}}>
                        <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item>
                                <ListChipError label="Unread" />
                            </Grid>
                            <Grid item>
                                <ListChipWarning label="New"/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ItemAction>
            <Divider sx={{marginTop: 0, marginBottom: 0}} />
            <ItemAction>
                <ListItem alignItems="center" sx={{padding: 0}}>
                    <ListItemAvatar>
                        <ListAvatarSuccess>
                            <IconBuildingStore stroke={1.5} size="1.3rem" />
                        </ListAvatarSuccess>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">Store Verification Done</Typography>} />
                    <ListAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <ActionText variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </ActionText>
                            </Grid>
                        </Grid>
                    </ListAction>
                </ListItem>
                <Grid container direction="column" sx={{paddingLeft: '56px'}}>
                    <Grid item xs={12} sx={{paddingBottom: '16px'}}>
                        <Typography variant="subtitle2">We have successfully received your request.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item>
                                <ListChipError label="Unread"/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ItemAction>
            <Divider sx={{marginTop: 0, marginBottom: 0}} />
            <ItemAction>
                <ListItem alignItems="center" sx={{padding: 0}}>
                    <ListItemAvatar>
                        <ListAvatarPrimary>
                            <IconMailbox stroke={1.5} size="1.3rem" />
                        </ListAvatarPrimary>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">Check Your Mail.</Typography>} />
                    <ListAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <ActionText variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </ActionText>
                            </Grid>
                        </Grid>
                    </ListAction>
                </ListItem>
                <Grid container direction="column" sx={{paddingLeft: '56px'}}>
                    <Grid item xs={12} sx={{paddingBottom: '16px'}}>
                        <Typography variant="subtitle2">All done! Now check your inbox as you&apos;re in for a sweet treat!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item>
                                <Button variant="contained" disableElevation>
                                    Mail
                                    <IconBrandTelegram stroke={1.5} size="1.3rem" sx={{
                                        marginLeft: '8px',
                                        marginTop: '-3px'
                                    }}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ItemAction>
            <Divider sx={{marginTop: 0, marginBottom: 0}} />
            <ItemAction>
                <ListItem alignItems="center" sx={{padding: 0}}>
                    <ListItemAvatar>
                        <Avatar alt="John Doe" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
                    <ListAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <ActionText variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </ActionText>
                            </Grid>
                        </Grid>
                    </ListAction>
                </ListItem>
                <Grid container direction="column" sx={{paddingLeft: '56px'}}>
                    <Grid item xs={12} sx={{paddingBottom: '16px'}}>
                        <Typography component="span" variant="subtitle2">
                            Uploaded two file on &nbsp;
                            <Typography component="span" >
                                21 Jan 2020
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <UploadCard>
                                    <CardContent>
                                        <Grid container direction="column">
                                            <Grid item xs={12}>
                                                <Stack direction="row" spacing={2}>
                                                    <IconPhoto stroke={1.5} size="1.3rem" />
                                                    <Typography variant="subtitle1">demo.jpg</Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </UploadCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ItemAction>
            <Divider sx={{marginTop: 0, marginBottom: 0}} />
            <ItemAction>
                <ListItem alignItems="center" sx={{padding: 0}}>
                    <ListItemAvatar>
                        <Avatar alt="John Doe" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
                    <ListAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <ActionText variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </ActionText>
                            </Grid>
                        </Grid>
                    </ListAction>
                </ListItem>
                <Grid container direction="column" sx={{paddingLeft: '56px'}}>
                    <Grid item xs={12} sx={{paddingBottom: '16px'}}>
                        <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item>
                                <ListChipSuccess label="Confirmation of Account." />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ItemAction>
        </NavContainer>
    );
};

export default NotificationList;
