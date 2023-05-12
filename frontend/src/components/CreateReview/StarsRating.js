import { useEffect, useState } from 'react';
import './stars.css';

const StarsRatingInput = ({ rating, disabled, onChange }) => {
    const [activeRating, setActiveRating] = useState(rating);

    useEffect(() => {
        setActiveRating(rating)
    }, [rating]);

    const starIcon = (number) => {
        const props = {};
        if (!disabled) {
            props.onMouseEnter = () => setActiveRating(number);
            props.onMouseLeave = () => setActiveRating(rating);
            props.onClick = () => onChange(number);
        }
        return (
            <div
                key={number}
                className={activeRating >= number ? "filled" : "empty"}
                {...props}
            >
                <i class="fa-solid fa-star fa-xl"></i>
            </div>
        );
    };

    return (
        <div className="rating-input">
            {[1, 2, 3, 4, 5].map((number) => starIcon(number))}
        </div>
    );
}

export default StarsRatingInput;