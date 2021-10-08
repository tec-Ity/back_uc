import { Fragment } from 'react';

export default function RowIpt(props) {
        const {children, rowClass} = props;
        // console.log(children);
        let colMdNum = "col-md-8";
        if(Array.isArray(children)) {
                if(children.length === 2) {
                        colMdNum = "col-md-4";
                } else if(children.length === 3) {
                        colMdNum = "col-md-2";
                } else {
                        colMdNum = null;
                }
        }

        return (<>
                {
                        !colMdNum || children === undefined
                                ? <h3 className="text-danger">标签内不可为空 子标签数量不可大于3</h3>
                                : Array.isArray(children)
                                        ?(
                                                <div className={`row ${rowClass}`}>
                                                {
                                                        children?.map((item, index) => {
                                                                return (<Fragment key={index}>
                                                                        {item.props.label && <label htmlFor={item.propsid} className="col-md-2 col-form-label "> {item.props.label} </label>}
                                                                        <div className={item.props.colnum?item.props.colnum:colMdNum}>
                                                                                {item}
                                                                        </div>
                                                                </Fragment>)
                                                        })
                                                }
                                                </div>
                                        )
                                        :  (
                                                 <div className={`row ${rowClass}`}>
                                                        <label htmlFor={children.propsid} className="col-md-2 col-form-label "> {children.props.label} </label>
                                                        <div className="col-md-10">
                                                                {children}
                                                        </div>
                                                </div>
                                        )
                
                }
                
        </>)
}
