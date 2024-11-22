import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function RecipeReviewCard({props}:any) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'70%'}}>
        <Card sx={{ minWidth: 500 }}>
        <h1 style={{ margin: 0, color: 'white', position:'relative', backgroundColor:'lightblue', padding:'5px' }}>{props?.name}</h1>
        <p style={{backgroundColor:'lightgreen', color:'white', padding:'5px'}}>Published: {new Date(props.release).toLocaleDateString()}</p>
      <CardHeader
        avatar = {
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                {props?.authors?.map((a:any)=>(<><Avatar style={{marginLeft:'10px'}} key={a._id} src={a.avatar} /> <i style={{marginLeft:'8px', backgroundColor:'lightblue', padding:'0 5px', color:'white'}}>{a.name}</i></>))}
            </div>
        }

        title=""
        subheader=""
      />
      
      <CardMedia
        component="img"
        height="194"
        style={{objectFit:'contain'}}
        image={props?.images?.[0]}
        alt={props?.name}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign:'justify' }}>
          {props?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <p style={{backgroundColor:'orange', color:'white', padding:'5px'}}>Regarding Pictures</p>
        {props?.images?.map((i:any, index: number)=>(
          <CardMedia
          key={i._id}
          component="img"
          height="194"
          style={{objectFit:'contain', marginBottom:'10px'}}
          image={props?.images?.[index]}
          alt={props?.name}
        />
        ))}
        
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
}
