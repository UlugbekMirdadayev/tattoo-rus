import { signInFx } from '@/api/auth'
import PasswordInput from '@/modals/AuthForm/PasswordInput'
import PhoneInput from '@/modals/AuthForm/PhoneInput'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './SignInForm.module.css'

export default function SignInForm() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm()
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (password.length === 0) {
            setAuthError('')
        }
    }, [password])

    const onSubmit = async (inputValue) => {
        try {
            setLoading(true)
            setAuthError('')
            const { data } = await signInFx({
                url: `/system/api/auth/login/?phone=${inputValue.phone}&password=${inputValue.password}`,
            })

            console.log(data)
            if (data.result === 'error') {
                setAuthError(data.reason)
            }
            return "cookies"
        } catch (error) {
            console.error('SignIn Error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <PhoneInput register={register} errors={errors} control={control} />
            <PasswordInput
                register={register}
                errors={errors}
                control={control}
                authError={authError}
                password={password}
                setPassword={setPassword}
            />
            <button
                className={styles.button}
                disabled={loading}
                id="auth"
                type="submit"
            >
                {!loading ? 'Авторизоваться' : <CircularProgress size={16} />}
            </button>
        </form>
    )
}
