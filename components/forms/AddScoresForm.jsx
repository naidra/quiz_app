import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { addPlayerNameAction } from "../../actions/quizActions"
import { addPlayer } from "../../helpers/firebase/crud"

const AddScoreForm = ({ addPlayerNameActionHandler, players, toggleFn }) => (
	<div>
		<Formik
			initialValues={{ player_name: "" }}
			validate={values => {
				const errors = {}
				if (!values.player_name || (values.player_name && values.player_name.length < 2)) {
					errors.player_name = "You must enter your name to proceed"
				}
				return errors
			}}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(false)
				addPlayer(players, { emri:values.player_name, piket:3, koha:Date.now(), aprovuar: false })
				toggleFn(false)
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				isSubmitting,
			}) => (
				<Form onSubmit={handleSubmit} className="scores_form floating-label">
					<Form.Group controlId="formBasicPassword" className="mt-3 mb-3">
						<Form.Control
							type="text"
							placeholder=" "
							name="player_name"
							className="player_name"
							onChange={e => {
								handleChange(e)
								addPlayerNameActionHandler(e.target.value)
							}}
							value={values.player_name}
							isInvalid={!!touched.player_name && !!errors.player_name}
						/>
						<Form.Label>Your name</Form.Label>
						<Form.Control.Feedback type="invalid">{errors.player_name && touched.player_name && errors.player_name}</Form.Control.Feedback>
					</Form.Group>
					<Button className="submit_button" type="submit" disabled={isSubmitting}><span>Save score</span></Button>
				</Form>
			)}
		</Formik>
	</div>
)


AddScoreForm.propTypes = {
	addPlayerNameActionHandler: PropTypes.func.isRequired,
	toggleFn: PropTypes.func.isRequired,
	players: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

const mapStateToProps = state => ({
	players: state.players
})

const mapDispatchToProps = dispatch => ({
	addPlayerNameActionHandler: e => dispatch(addPlayerNameAction(e))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddScoreForm)