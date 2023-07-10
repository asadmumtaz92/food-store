const Footer = (props) => {

    const sty = {
        padding: 0,
        margin: 0,
        width: '100%',
        right: 0,
        left: 0,
        position: 'absolute',
        bottom: props?.screen === 'Login' && 0,
    }
    const dd = {
        bottom: 0
    }

    return (
        <div className={`row col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-dark text-white pt-3 pb-3`} style={sty}>
            <div className={`col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center`}>
                2023 @ Food Store. All rights reserved
            </div>
            <div className={`col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center`}>
                <a href="https://www.linkedin.com/company/soft-technologies-pvt-ltd/" target="blank" className={`text-white text-bolder`} >Soft Technologies Pvt. Ltd. </a>
            </div>
        </div>
    )
}

export default Footer
