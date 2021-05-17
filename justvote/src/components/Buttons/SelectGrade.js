import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectGrade(props) {
  const classes = useStyles();
  const [grade, setGrade] = React.useState('');

  const handleChange = (e) => {
    setGrade(e.target.value);
    this.props.onChange(this.state.grade)
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">학년</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={grade}
          onChange={handleChange}
          label="Grade"
        >
          <MenuItem value={10}>1학년</MenuItem>
          <MenuItem value={20}>2학년</MenuItem>
          <MenuItem value={30}>3학년</MenuItem>
          <MenuItem value={40}>4학년</MenuItem>
          <MenuItem value={50}>그 외</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}