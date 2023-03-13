import { recommendations, selectedRecommendations } from "../data/index.js";
const rejectedArr = selectedRecommendations.rejectedRecommendations;
const acceptedArr = selectedRecommendations.acceptedRecommendations;

export const getRecommendations = (req, res) => {
  return res.send({
    data: recommendations,
  });
};

export const putAcceptRecommendations = (req, res) => {
  if (!acceptedArr.find((movie) => movie.id === req.params.id)) {
    const result = recommendations.find((index) => index.id === req.params.id);
    acceptedArr.push(result);
  }
  
  return res.send(acceptedArr);
};

export const putRejectRecommendations = (req, res) => {
  if (!rejectedArr.find((movie) => movie.id === req.params.id)) {
    const result = recommendations.find((index) => index.id === req.params.id);
    rejectedArr.push(result);
  }
  return res.send(rejectedArr);
};
