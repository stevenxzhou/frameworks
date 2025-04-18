// desctructuring is for object, not array. 
const parentComponent = ({className, children, ...rest}) => {
    return (
        <div className={className} {...rest}>
            {children}
        </div>
    )
}

export default parentComponent