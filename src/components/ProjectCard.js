import {
  Avatar,
  Box,
  Card,
  CardMedia,
  colors,
  Divider,
  Grid,
  IconButton,
  Link,
  makeStyles,
  SvgIcon,
  Tooltip,
  Typography
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Rating } from '@material-ui/lab';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/es'; // without this line it didn't work
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Share2 as ShareIcon } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    height: 200,
    backgroundColor: theme.palette.background.dark
  },
  likedButton: {
    color: colors.red[600]
  },
  caption: {
    display: 'box',
    lineClamp: 7,
    boxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 5
  },
  membersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
  }
}));

moment.locale('es');

const ProjectCard = ({ className, project, ...rest }) => {
  const classes = useStyles();
  const [isLiked, setLiked] = useState(project.isLiked);
  const [likesCount, setLikesCount] = useState(project.likesCount);

  const handleLike = () => {
    setLiked(true);
    setLikesCount(prevLikes => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikesCount(prevLikes => prevLikes - 1);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={3}>
        <CardMedia className={classes.image} image={project.image} />
        <Box display='flex' alignItems='center' mt={2}>
          {/*<Avatar alt="Author" src={project.author.avatar}>
            {getInitials(project.author.name)}
          </Avatar>*/}
          <Box ml={2}>
            <Link
              color='textPrimary'
              component={RouterLink}
              to={`/app/projects/overview/${project.id}`}
              variant='h5'
            >
              {project.title}
            </Link>
            <Typography variant='body2' color='textSecondary'>
              Por{' '}
              <Link
                color='textPrimary'
                component={RouterLink}
                to='#'
                variant='h6'
              >
                {project.author.name}
              </Link>{' '}
              | Actualizado {moment(project.updatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box pb={2} px={3} className={classes.caption}>
        <Typography color='textSecondary' variant='body2'>
          {project.caption}
        </Typography>
      </Box>
      <Box py={2} px={3}>
        <Grid alignItems='center' container justify='space-between' spacing={3}>
          <Grid item>
            <Typography variant='h5' color='textPrimary'>
              {numeral(project.budget).format(`${project.currency}0,0.000`)}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Objetivo
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h5' color='textPrimary'>
              {project.location}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Ubicación
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h5' color='textPrimary'>
              {project.type}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Tipo
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box py={2} pl={2} pr={2} display='flex' alignItems='center'>
        {isLiked ? (
          <Tooltip title='Unlike'>
            <IconButton className={classes.likedButton} onClick={handleUnlike}>
              <FavoriteIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Like'>
            <IconButton onClick={handleLike}>
              <FavoriteBorderIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        )}
        <Typography variant='subtitle2' color='textSecondary'>
          {likesCount}
        </Typography>
        <SvgIcon
          fontSize='small'
          color='action'
          className={classes.membersIcon}
        >
          <ShareIcon />
        </SvgIcon>
        <Box flexGrow={1} />
        <Rating value={project.rating} size='small' readOnly />
      </Box>
    </Card>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default ProjectCard;
