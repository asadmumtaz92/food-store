import styles from './styles/mealSummary.module.css'
import Card from '../UI/Card'

const mealSummary = () => {
    return (
        <Card className={styles.summary}>
            <h2>Delicious food, Delivered to you</h2>
            <p>
                Choose your favorite meal from our broad selection of available meals
                and enjoy a delicious lunch or dinner at home.
            </p>
            <p>
                All our meals are cooked with high-quality ingredients, just-in-time and
                of course by experienced chefs!
            </p>
        </Card>
    )
}

export default mealSummary
