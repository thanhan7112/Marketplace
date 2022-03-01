import { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import Main from './components/MainComponent';
function App() {
    
    const [currentAccount, setCurrentAccount] = useState(null);

    const checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        } else {
            console.log("Wallet exists! We're ready to go!")
        }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
       
    } else {
        console.log("No authorized account found");
    }
  }

    const connectWalletHandler = async () => {
        const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }
    const connectWalletButton = () => {
        return (
            <button style={{textAlign: 'center', marginTop:'200px', marginLeft:'800px'}} onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
                Connect Wallet
            </button>
        )
    }

  const MainButton = () => {
    return (
      <Main></Main>
    )
  }

  useEffect(() => { //Xử lý check... khi cho gì thay đổi
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <div>
        {currentAccount ? MainButton() : connectWalletButton()}
      </div>
    </div>
  )
}

export default App;

