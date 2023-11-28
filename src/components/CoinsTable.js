import axios from 'axios'
import React from 'react'
import { CoinList } from '../config/Api'
import { CryptoState } from '../CryptoContex'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container, createTheme, LinearProgress, makeStyles, ThemeProvider, Typography, TextField } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from './Banner/Carousal'
import { Pagination } from '@material-ui/lab'

const useStyles = makeStyles(() => ({
    row: {
        backgroundColor: '#16171a',
        cursor: 'pointer',
        fontFamily: 'Montserrat',
        "&:hover": {
            backgroundColor: '#131111'
        }
    }
}))
const CoinsTable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const { currency, symbol } = CryptoState();
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency))
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
    const handleSearch = () => {
        return coins.filter(
            (coin) => 
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        )
    }

    const classes = useStyles(() => ({
        row: {
            backgroundColor: '#16171a',
            cursor: 'pointer',
            "&:hover": {
                backgroundColor: '#131111',
            },
            fontFamily: 'Montserrat',
        },
        pagination: {
            '& .MuiPaginationItem-root': {
                color: 'gold'
            }
        }
    }))
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: 'center' }}>
                <Typography variant='h4'
                    style={{ margin: 18, fontFamily: 'Montserrat' }}>
                    CryptoCurrency Prices by Market Cap
                </Typography>
                <TextField label='Search For Crypto Currency..'
                    variant='outlined'
                    style={{ marginBottom: 20, width: '100%' }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: 'gold' }} />
                        ) :
                            (
                                <Table>
                                    <TableHead style={{ backgroundColor: '#EEBC10' }}>
                                        <TableRow>
                                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                                <TableCell
                                                    style={{
                                                        color: "black",
                                                        fontWeight: "700",
                                                        fontFamily: "Montserrat",
                                                    }}
                                                    key={head}
                                                    align={head === "Coin" ? "" : "right"}
                                                >
                                                    {head}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>{handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        console.log(row)
                                        return (
                                            <TableRow
                                                onClick={() => navigate(`coins/${row.id}`)}
                                                className={classes.row}
                                                key={row.name}>
                                                <TableCell component='th'
                                                    scope='row'
                                                    style={{
                                                        display: 'flex',
                                                        gap: 15
                                                    }}
                                                >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height='50'
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div
                                                        style={{ display: "flex", flexDirection: "column" }}
                                                    >
                                                        <span
                                                            style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22,
                                                            }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{ color: "darkgrey" }}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, -6)
                                                    )}
                                                    M
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}</TableBody>
                                </Table>
                            )
                    }
                </TableContainer>
                <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    classes={{ ul: classes.pagination }}
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable