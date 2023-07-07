import styles from './styles/HeaderImage.module.css'
import BG_Image from '../../assets/images/meals.jpg'
const HeaderImage = (props) => {
    return (
        <div className={styles.imageBox}>
            <img src={BG_Image} alt='' />
        </div>
    )
}

export default HeaderImage
