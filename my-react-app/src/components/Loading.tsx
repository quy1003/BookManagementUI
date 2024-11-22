import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const Loading = () => {
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Box sx={{ width: 300, textAlign:'center' }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
    </div>
  );
}

export default Loading