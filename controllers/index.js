displayName = (req, res) => {
    const data = "Kristofer Wemyss";
    res.status(200).send(data);
};

module.exports = {
    displayName,
};