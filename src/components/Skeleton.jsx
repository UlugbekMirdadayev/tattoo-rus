import MuiSkeleton from '@mui/material/Skeleton'

export const Skeleton = (props) => (
    <MuiSkeleton {...props} style={{ ...props.style, cursor: 'progress' }} />
)
