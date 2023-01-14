import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email,password })
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }
  const handleLogup = async (e)=>{
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({ email,password })
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Memfiredb + React</h1>
        <p className="description">使用下面的电子邮件通过魔术链接登录</p>
        {loading ? (
          'Sending magic link...'
        ) : (
          <form >
            <div>
            <label htmlFor="email">邮箱</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="email">密码</label>
            <input
              id="password"
              className="inputField"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button onClick={handleLogup} className="button block" aria-live="polite">
            注册
            </button>
            <butto onClick={handleLogin} className="button block" aria-live="polite">
            登录
            </butto>
          </form>
        )}
      </div>
    </div>
  )
}