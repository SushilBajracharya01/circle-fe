import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../_redux/redux';
import usePersist from '../../hooks/usePersist';
import { Link, Outlet } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { useQueryHook } from '../../hooks/react-query/useQueryHook';
import jsCookie from 'js-cookie';
import { LOCAL_ACCESS_TOKEN_NAME, LOCAL_REFRESH_TOKEN_NAME } from '../../constants/constants';

/**
 * 
 */
export default function PersistLoginWrapper() {
    const [persist] = usePersist();
    const token = useAppSelector(state => state.auth.token) || localStorage.getItem(LOCAL_ACCESS_TOKEN_NAME);
    const effectRan = useRef(false);

    const [trueSuccess, setTrueSuccess] = useState(false);
    const [refreshToken, setRefreshToken] = useState<undefined | string>();

    const handleRefreshSuccess = () => {
        setTrueSuccess(true)
    }
    const handleRefreshError = () => {

    }

    const { isLoading, isError, isSuccess } = useQueryHook({
        queryName: 'refresh',
        queryRoute: '/auth/refresh/',
        options: {
            enabled: Boolean(refreshToken),
            onSuccess: handleRefreshSuccess,
            onError: handleRefreshError
        },
        axiosOptions: {
            refreshToken: refreshToken
        }
    })


    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== "development") {
            const verifyRefreshToken = async () => {
                console.log("verifyRefreshToken");

                try {
                    const refreshToken = jsCookie.get(LOCAL_REFRESH_TOKEN_NAME);
                    setRefreshToken(refreshToken);
                } catch (err) {
                    console.error(err);
                }
            };

            if (!token && persist) verifyRefreshToken();
        }

        return () => { effectRan.current = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let content = null;

    console.log(persist, 'persist', token, 'token', isLoading, 'isLoading')
    if (!persist) {
        console.log("No persist");
        content = <Outlet />;
    } else if (isLoading) {
        content = <Loader />;
    } else if (isError) {
        console.log("error");
        content = (
            <p>
                <Link to="/login">Please Login again</Link>
                {/* <ErrorAlert message={error?.data?.message} /> */}
            </p>
        );
    } else if (isSuccess && trueSuccess) {
        console.log("success");
        content = <Outlet />;
    } else if (token) {
        console.log("token uninitialized");
        content = <Outlet />;
    }

    return content;
}