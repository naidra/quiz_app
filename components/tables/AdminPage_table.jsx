import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Checkbox from "@material-ui/core/Checkbox"
import PropTypes from "prop-types"
import { updatePlayer, deletePlayer } from "../../helpers/firebase/crud"


const columns = [
	{ id: "emri", label: "Name", minWidth: 170 },
	{ id: "piket", label: "Points", minWidth: 170 },
	{ id: "koha", label: "Time", minWidth: 170 },
	{ id: "aprovuar", label: "Approved", minWidth: 170, align:"right" },
	{ id: " ", label: " ", minWidth: 170 }
]

const useStyles = makeStyles({
	root: {
		width:"100%",
	},
	container: {
		maxHeight:600,
	},
})

const AdminPage_table = ({ players }) => {
	

	const classes = useStyles()
	const rows = players
    
	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows && rows.map((row, i) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.koha}>
									<TableCell align="left">{ row.emri }</TableCell>
									<TableCell align="left">{ row.piket }</TableCell>
									<TableCell align="left">{ new Date(row.koha).toDateString() }</TableCell>
									<TableCell align="right">
										<Checkbox
											checked={row.aprovuar}
											value="secondary"
											color="primary"
											onChange={() => updatePlayer(players, i, !row.aprovuar)}
										/> { row.aprovuar ? "Po" : "Jo" }
									</TableCell>
									<TableCell align="right">
										<button className="delete_btn" onClick={() => { if (confirm(`Fshije ${row.emri}?`)) deletePlayer(players, row) }}>
											<svg><use xlinkHref="#delete-icon" fill="#e0115f" /></svg>
										</button>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}

AdminPage_table.defaultProps = {
	players: []
}

AdminPage_table.propTypes = {
	players: PropTypes.arrayOf(PropTypes.shape({})),
}

export default AdminPage_table