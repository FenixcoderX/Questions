import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const RequireAuth = ({children, authedUser}) => {
    //const redirectUrl = window.location.href.toString().split(window.location.host)[1];

    return authedUser ? children : <Navigate to="/login" replace/>;
};

const mapStateToProps = ({authedUser}) => ({
    authedUser,
});

export default connect(mapStateToProps)(RequireAuth);
