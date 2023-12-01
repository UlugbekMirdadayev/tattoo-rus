import { Controller } from 'react-hook-form'
import MaskedInput from 'react-input-mask'
import styles from './AuthForm.module.css'

export default function PhoneInput({ register, errors, control }) {
    return (
        <label className={styles.label}>
            Телефон
            <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Введите номер телефона',
                    minLength: 18,
                }}
                render={({ field }) => (
                    <>
                        <MaskedInput
                            mask="+7 (999) 999 99 99"
                            maskChar=""
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className={styles.input}
                            style={{
                                border: errors.phone
                                    ? '2px solid rgb(222, 33, 4)'
                                    : '',
                            }}
                        >
                            {(inputProps) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    placeholder="+7 (___) ___ __ __"
                                />
                            )}
                        </MaskedInput>
                        {errors.phone && (
                            <span className={styles.error_alert}>
                                Введите номер телефона
                            </span>
                        )}
                    </>
                )}
            />
        </label>
    )
}
