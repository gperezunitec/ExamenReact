export const Entrada = ({id,iconName,inputType,placeholder,onChange,value}) => {

    return (
        <>
            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className={iconName}></i>
                                    <input className="form-control" type={inputType} id={id} placeholder={placeholder} onChange={onChange} value={value}/>
                                </span>
            </div>
        </>
    )

}