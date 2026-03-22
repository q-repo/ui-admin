import { ThemeProvider } from '@/context/ThemeContext';
import Styles from './layout.module.css';
import GridShape from '@/components/common/GridShape';
import ThemeTogglerTwo from '@/components/common/ThemeTogglerTwo';
import Icon from '@/icons';

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <main className={Styles.Layout}>
      <div className="relative p-6 bg-white h-full w-full z-1 dark:bg-gray-900 sm:p-0">
        <ThemeProvider>
          <section className='relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0'>
            {children}
            <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
              <div className="relative items-center justify-center  flex z-1">
                {/* <!-- ===== Common Grid Shape Start ===== --> */}
                <GridShape />
                <div className="flex text-gray-400 dark:text-white/60 items-center max-w-xs">
                  <div className='w-8 flex items-center aspect-square'>
                    <Icon
                      name='box-cube'
                      fontSize={32}
                    />
                  </div>
                  <h1 className="text-5xl font-bold">
                    Q-REPO
                  </h1>
                </div>
              </div>
            </div>
            <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
              <ThemeTogglerTwo />
            </div>
          </section>
        </ThemeProvider>
      </div>
    </main>
  )
}