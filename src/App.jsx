import { useState } from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from'@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from './form.module.css'

const schema = yup.object({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
}).required();

function App() {
  
 const [isSucess, setIsSucess] = useState(false)


  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  })
 const onSubmit = () => {
    setIsSucess(true)
  }

  return (
   <form onSubmit={handleSubmit(onSubmit)} className={styles.contentForm}>
    <div className={styles.formGroup}>
      <input 
      type="text" 
      placeholder="Insira seu nome"
      {...register("nome")}
      className={(errors.nome) ? `${styles.inputError}` : ''}
      />
      <span className={styles.labelError}>{errors.nome?.message}</span>
    </div>
    <div className={styles.formGroup}>
      <input 
      type="email" 
      placeholder="Insira seu email"
      {...register("email")}
      className={(errors.email) ? `${styles.inputError}` : ''}
      />
      <span className={styles.labelError}>{errors.email?.message}</span>
    </div>
    <div className={styles.formGroup}>
      <input 
      type="password" 
      placeholder="Insira sua senha"
      {...register("password")}
      className={(errors.password) ? `${styles.inputError}` : ''}
      />
      <span className={styles.labelError}>{errors.password?.message}</span>
    </div>
    <div className={styles.formGroup}>
      <input 
      type="password" 
      placeholder="Confirmar sua senha"
      {...register("password_confirmation")}
      className={(errors.password) ? `${styles.inputError}` : ''}
      />
      <span className={styles.labelError}>{errors.password_confirmation?.message}</span>
    </div>

    <button type="submit">Enviar Formulário</button>

    {
      isSucess && <p>Formulario enviado com sucesso!</p>
    }
    
    
   </form>       
  )
}

export default App
