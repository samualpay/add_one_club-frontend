import * as React from 'react';
import {useSelector} from 'react-redux'
import {RootState} from '../redux'
import {
    Route,
    Redirect,
    RouteProps
} from 'react-router-dom';

interface ShouldLoginRouteProps extends RouteProps {
    isLogin: boolean;
}

function ShouldLoginRoute(props: RouteProps) {
    const {isLogin} = useSelector((state:RootState)=> state.user)
    const { children, location, ...rest } = props
    return (
        <Route
            {...rest}
            render={() => isLogin ? (
                children
            ) : (
                    <Redirect to={{ pathname: '/admin/login', state: { from: location } }} />
                )
            }
        />
    )
}

// const mapStateToProps = (state:RootState) =>({isLogin:state.user.isLogin})
export default ShouldLoginRoute
// export default (connect(
//     mapStateToProps,
//     null
// )(ShouldLoginRoute))
