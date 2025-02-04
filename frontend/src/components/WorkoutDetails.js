import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const handleClick = async () => {
    const respone = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
    const json = await respone.json();

    if (respone.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: { _id: workout._id } });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load: </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default WorkoutDetails;
