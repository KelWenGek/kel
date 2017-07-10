import { connect } from 'react-redux';
import FooterLink from '../components/FooterLink';
import { setVisibilityFilter, clearCompleted } from '../store/action';

const mapStateToProps = (state, ownProps) => {
  return {
    curFilter: state.get('visibilityFilter'),
    left: state.get('todos').size
  };
};
// state.get('todos').filter(todo => !todo.completed).size

const mapDispatchToProps = (dispatch) => {
  return {
    onFilter: (filter) => {
      dispatch(setVisibilityFilter(filter));
    },
    doClearCompleted: () => {
      dispatch(clearCompleted());
    }
  };
};
const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterLink);

export default Footer;
