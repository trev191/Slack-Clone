import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
/**
 * Simple component with no state.
 * @return {object} JSX
 */
function BottomBar() {
  return (
    <div>
        <ButtonGroup color="primary" fullWidth="true"
        aria-label="outlined primary button group">
            <Button><HomeIcon /></Button>
            <Button><ForumIcon /></Button>
            <Button><AlternateEmailIcon /></Button>
            <Button><SearchIcon /></Button>
            <Button><AccountCircleIcon /></Button>
        </ButtonGroup>
    </div>
  );
}

export default BottomBar;
