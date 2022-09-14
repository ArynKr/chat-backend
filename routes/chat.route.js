const express = require('express')
const router = express.Router()
const StreamChat = require('stream-chat').StreamChat;
const serverClient = StreamChat.getInstance('gf7nk9gff48b','ngajhf546uubwadcumqhxfp8z9vr35cnagqhw5tatjtvfv7dpzpubu5wae4q2fsk');
// serverClient.connectUser({id: 'arynkr'}, serverClient.createToken('arynkr'));

router.get('/', (req, res) => {
  res.send("Inside chat backend")
})

// Create and return token
router.post('/getToken', (req, res) => {
  const {username} = req.body;
  const token = serverClient.createToken(username);
  // console.log("here");
  res.json({token})
})

router.post('/addUser', async (req, res) => {
  const {userId} = req.body;
  const updateResponse = await serverClient.upsertUser({ 
    id: userId, 
    role: 'user',
  });
  const channel = await serverClient.queryChannels({});
  const data = await channel[0].addMembers([userId]);
  res.json({data})
})

module.exports = router;