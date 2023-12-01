import { Controller } from 'react-hook-form'
import styles from './AuthForm.module.css'

export default function PasswordInput({
    register,
    errors,
    control,
    authError,
    password,
    setPassword,
}) {
    return (
        <label className={styles.label}>
            Пароль
            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Введите пароль',
                }}
                render={({ field }) => (
                    <>
                        <input
                            {...field}
                            {...register('password', {
                                required: 'Введите пароль',
                            })}
                            onChange={(e) => {
                                field.onChange(e.target.value)
                                setPassword(e.target.value)
                            }}
                            value={password}
                            className={styles.input}
                            style={{
                                border:
                                    errors.password || authError
                                        ? '2px solid rgb(222, 33, 4)'
                                        : '',
                            }}
                            type="password"
                            placeholder="*********"
                        />
                        {errors.password && (
                            <span className={styles.error_alert}>
                                {errors.password.message}
                            </span>
                        )}
                        {authError && (
                            <span className={styles.error_alert}>
                                {authError}
                            </span>
                        )}
                    </>
                )}
            />
        </label>
    )
}
