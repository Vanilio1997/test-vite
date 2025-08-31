import * as styles from './Checkbox.module.css';

interface ICheckbox {
    checked: boolean;
    onChange: () => void;
    id: string;
    index: number;
}

const Checkbox = ({ checked, onChange, id }: ICheckbox) => {
    return (
        <div className={styles.checkboxContainer}>
            <input
                type="checkbox"
                id={id}
                className={styles.checkboxInput}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id} className={styles.checkboxCustom} />
        </div>
    );
};

export default Checkbox;
