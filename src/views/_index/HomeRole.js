import React from 'react'
import { useSelector } from 'react-redux';
import {selectUser} from '../../features/authSlice'
import { FormattedMessage } from 'react-intl'; 
export default function HomeRole() {

        const curUser = useSelector(selectUser);

        return (
                <div className="text-center mt-5">
                        <h1><FormattedMessage id='welcom-title' defaultMessage='welcom-title' /></h1>
                        {
                                (curUser && curUser.code)
                                ?(<>
                                        <h2>
                                                <span className="mr-2">
                                                        <FormattedMessage id='welcom-code' defaultMessage='welcom-code' />
                                                </span>
                                                <span className="text-info">{curUser.code}</span></h2>
                                        <h2>
                                                <span className="mr-2">
                                                        <FormattedMessage id='welcom-role' defaultMessage='welcom-role' />
                                                </span>
                                                &nbsp;
                                                <span className="text-info">
                                                        <FormattedMessage id={`role-${curUser.role}`} defaultMessage={curUser.role} />
                                                </span>
                                        </h2>
                                </>
                                )
                                :<h2 className="text-warning">
                                        <FormattedMessage id='welcom-warning' defaultMessage='welcom-warning' />
                                </h2>
                        }
                </div>
        )
}
