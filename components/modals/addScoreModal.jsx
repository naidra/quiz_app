import { useState, useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import AddScoresForm from "../forms/AddScoresForm"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { collectionData } from "rxfire/firestore"
import { db } from "../../helpers/firebase/crud"
import { storePlayersAction } from "../../actions/quizActions"
import HeaderBg from "../../images/bg-2.jpg"

const AddScoreModal = ({ playerName, storePlayersAction }) =>  {
	const [smShow, setSmShow] = useState(true)
	useEffect(() => {
		collectionData(db.collection("quiz-321"), "quiz-players").subscribe(item => storePlayersAction(item[0].data))
	}, [])
  
	return (
		<Modal
			size="md"
			show={smShow}
			onHide={() => setSmShow(false)}
			aria-labelledby="example-modal-sizes-title-sm"
			className="add_score_modal"
			data-name={(playerName && playerName.length > 1) ? playerName : ""}
		>
			<Modal.Header closeButton style={{backgroundImage: `url(${HeaderBg})`}}>
				<Modal.Title id="example-modal-sizes-title-sm">Save your score</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddScoresForm toggleFn={setSmShow} />
			</Modal.Body>
		</Modal>
	)
}

AddScoreModal.propTypes = {
	playerName: PropTypes.string.isRequired,
	storePlayersAction: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
	playerName: state.playerName,
	playerPoints: state.playerPoints,
})

const mapDispatchToProps = { storePlayersAction }

export default connect(mapStateToProps, mapDispatchToProps)(AddScoreModal)