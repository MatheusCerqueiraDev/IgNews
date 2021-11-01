import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import styles from "./style.module.scss";

export function Header(){
    
    return(

        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="Out of Context Brasa"/>
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a>Home</a>
                    </ActiveLink>

                    <ActiveLink activeClassName={styles.active} href="/posts" >
                        <a>Posts</a>
                    </ActiveLink>
                    
                </nav>
                <SignInButton/>
                
            </div>
        </header>
    );
}