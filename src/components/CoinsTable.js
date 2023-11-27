import  axios  from 'axios'
import React from 'react'
import { CoinList } from '../config/Api'
import { CryptoState } from '../CryptoContex'
import { useState } from 'react'
import { useEffect } from 'react'
import {Container, createTheme, LinearProgress, ThemeProvider, Typography, TextField} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const CoinsTable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
     const {currency} = CryptoState();
    const fetchCoins = async() =>{
        setLoading(true);
        const {data} = await axios.get(CoinList(currency))
        console.log(data)
        setCoins(data);
        setLoading(false);
    }
    useEffect(() => {
     fetchCoins()
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            type: 'dark'
        }
    })
   return (
 <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign : 'center'}}>
        <Typography variant='h4'
        style={{margin: 18, fontFamily: 'Montserrat'}}>
            CryptoCurrency Prices by Market Cap
        </Typography>
        <TextField label='Search For Crypto Currency..'
        variant='outlined'
        style={{marginBottom:20, width: '100%'}}
        onChange={(e)=> setSearch(e.target.value)}
        />
        <TableContainer>
            {
                loading? (
                    <LinearProgress style={{backgroundColor: 'gold'}}/>
                ): (
                    <Table>
                        <TableHead style={{backgroundColor:'#EEBC10'}}>
                            <TableRow>
                                {["Coin","Price","24h Change","Market Cap"].map((head)=>{
                                    <TableCell
                                    style={{
                                        color: 'black',
                                        fontWeght: '700',
                                        fontFamily: 'Montserrat',
                                    }}
                                    key={head}
                                    align={head === 'Coin' ?'' : 'right'}
                                    >
                                        {head}
                                    </TableCell>
                                })
                                }
                            </TableRow>

                        </TableHead>
                    </Table>
                )
            }
        </TableContainer>
    </Container>
 </ThemeProvider>
  )
}

export default CoinsTable