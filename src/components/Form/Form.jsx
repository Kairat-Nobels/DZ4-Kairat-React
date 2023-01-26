import { useState } from 'react'
import styles from './form.module.css'

function Form()
{
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [fNameDirty, setFNameDirty] = useState(false)
    const [lNameDirty, setLNameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [telDirty, setTelDirty] = useState(false)
    const [fNameError, setFNameError] = useState("Фамилия не может быть пустым")
    const [lNameError, setLNameError] = useState("Имя не может быть пустым")
    const [emailError, setEmailError] = useState("Email не может быть пустым")
    const [telError, setTelError] = useState("Поле не может быть пустым")

    const [blockForm, setBLockForm] = useState(false)
    const [counter, setCounter] = useState(0)
    const blurHendler = (e) =>
    {
        switch (e.target.id) {
            case 'firstName':
                setFNameDirty(true)
                break;
            case 'lastName':
                setLNameDirty(true)
                break;
            case 'email':
                setEmailDirty(true)
                break;
            case 'tel':
                setTelDirty(true)
                break;
            default:
                break;
        }
    }

    const nameHendler = (e) =>
    {
        switch (e.target.id) {
            case 'firstName':
                setFName(e.target.value)
                setFNameError("")
                if(e.target.value.trim().length >= 1) setCounter(counter+1)
                break;
            case 'lastName':
                setLName(e.target.value)
                setLNameError("")
                if(e.target.value.trim().length >= 1) setCounter(counter+1)
                break;
            default:
                break;
        }
    }

    const emailHendler = (e) =>
    {
        setEmail(e.target.value)
        const emailReg = /^[a-zA-Z0-9_.-]+[A-Za-z0-9]+@[a-z]+\.(com|ru)$/;
        if (!emailReg.test(e.target.value)) setEmailError('Некоректный Email')
        else setEmailError('')
        if(e.target.value.trim().length >= 1) setCounter(counter+1)

    }

    const telHendler = (e) =>
    {
        setTel(e.target.value)
        const telReg = /^\+996\d{9}$/
        if (!telReg.test(e.target.value)) setTelError('Некоректный номер')
        else setTelError('')
        if(e.target.value.trim().length >= 1) setCounter(counter+1)

    }

    const chekHandler = (e) =>
    {
        if (fNameError || lNameError || emailError || telError) setBLockForm(false);
        else setBLockForm(true)
    }

    const submitHendler =(e)=>{
        e.preventDefault()
        let mounth = new Date().getMonth()
        let day = new Date().getDate()
        if (day >= 29) {
            day = 5
            mounth++
        }
        else if (day >= 25) {
            day = day + 6 - 30
            mounth++
        }
        else {
            day += 6;
        }
        const mounths = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря',]
        alert(`Форма отправлена\n Bы согласились выплатить мне 1000с до ${day} ${mounths[mounth]}`)
        e.target.reset()
        setFName('')
        setLName('')
        setEmail('')
        setTel('')
        setCounter(0)
        setBLockForm(false)
    }
    return (

        <form onSubmit={submitHendler} className={styles.form} >
            <h2>Заполните форму <span>(все поля обязательны)</span></h2>

            <label htmlFor="firstName">Введите вашу Фамилию: </label>
            <div className={styles.forInput}>
            {(fNameDirty && fNameError) && <p className={styles.error}>{fNameError}</p>}
                <input readOnly={blockForm} value={fName} onBlur={blurHendler} onChange={nameHendler} type="text" id="firstName" placeholder='Фамилия' />
            </div>
            
            <label htmlFor="lastName">Введите ваше Имя: </label>
            <div className={styles.forInput}>
                {(lNameDirty && lNameError) && <p className={styles.error}>{lNameError}</p>}
                <input readOnly={blockForm} value={lName} onBlur={blurHendler} onChange={nameHendler}  type="text" id="lastName" placeholder='Имя' />
            </div>

            <label htmlFor="email">Введите ваш Email: </label>
            <div className={styles.forInput}>
                {(emailDirty && emailError) && <p className={styles.error}>{emailError}</p>}
                <input readOnly={blockForm} value={email} onBlur={blurHendler} onChange={emailHendler} type="email" id="email" placeholder='email@gmail.com' />
            </div>

            <label htmlFor='tel'>Ваш телефонный номер: </label>
            <div className={styles.forInput}>
                {(telDirty && telError) && <p className={styles.error}>{telError}</p>}
                <input readOnly={blockForm} value={tel} onBlur={blurHendler} onChange={telHendler} type="tel" id="tel" placeholder='+996502551118' />
            </div>

            <div className={styles.agreement}>
                <div>
                    <label htmlFor="agreement">Условие соглашения:</label>
                    <textarea id="agreement" cols="30" rows="4" readOnly defaultValue="Принимая это соглашение или используя программное обеспечение, вы соглашаетесь со всеми настоящими условиями, а также даете согласие на передачу определенной информации в процессе активации и использования программного обеспечения в соответствии с заявлением о конфиденциальности, описанным в Разделе 3. И вы должны мне выплатить 1000сом в течении одной недели с момента принятия этого соглашения.  Если вы не принимаете настоящие условия, вы не можете использовать программное обеспечение или его компоненты. Обратитесь к изготовителю устройства, установщику или розничному продавцу, если вы приобрели программное обеспечение напрямую, чтобы узнать правила возврата товара и согласно этим правилам вернуть программное обеспечение или устройство для получения возмещения его стоимости или зачисления эквивалентной суммы на ваш счет. Вы должны действовать в соответствии с этими правилами, в рамках которых для возврата денежных средств или для зачисления эквивалентной суммы на ваш счет может потребоваться возврат программного обеспечения вместе с устройством, на котором оно установлено, если это применимо."></textarea>
                </div>
                <div className={styles.yes}>
                    <label htmlFor="chek">Принять ?
                        <input readOnly={blockForm} disabled={counter >= 4 ? false : true} checked={blockForm} onChange={chekHandler} type="checkbox" id="chek" /> Да
                    </label>
                </div>
            </div>
            <button disabled={!blockForm} className={styles.button} style={blockForm ? { cursor: "pointer" } : {cursor:"not-allowed"}} type="submit">Отправить</button>
        </form>
    )
}
export default Form