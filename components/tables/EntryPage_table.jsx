import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import PropTypes from "prop-types"

const columns = [
	{ id: "emri", label: "Name", minWidth: 170 },
	{ id: "piket", label: "Points", minWidth: 170, align: "center" },

]

const useStyles = makeStyles({
	root: { width:"100%" },
	container: { maxHeight:800 }
})

const EntryPage_table = ({ players }) => {

	const classes = useStyles()
	const rows = players.filter(e => e.aprovuar).slice(0, 5)
	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						{columns.map(column => (
							<TableCell
								key={column.id}
								align={column.align}
								style={{ minWidth: column.minWidth, fontWeight: "600" }}
							>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows && rows.map(row => (
						<TableRow hover role="checkbox" tabIndex={-1} key={row.koha}>
							<TableCell align="left">{ row.emri }</TableCell>
							<TableCell align="center">{ row.piket }</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}



EntryPage_table.defaultProps = {
	players: []
}

EntryPage_table.propTypes = {
	players: PropTypes.arrayOf(PropTypes.shape({})),
}

export default EntryPage_table