import ResetPasswordForm from '../../components/PasswordReset'
import Footer from '../../components/Footer'
import AnimatedNav from '../../components/Nav2'


function Reset() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedNav />
      <main className="flex-1">
        <ResetPasswordForm />
      </main>
      <Footer />
    </div>
  )
}

export default Reset
