import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles ( theme => ( {
    root: {
        flexGrow: 1
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginTop:'none',
        paddingTop:'none'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    }
}))
export default useStyles