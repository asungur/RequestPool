let hashFunc = () => {
  // call hash function based on current time
  const timeNow = new Date()
  const createTime = timeNow.getTime()

  // this should give a unique hash value every time for the next 100 years or so
  // may not even need to query the DB first but we probably should
  const hash = createTime.toString(36)
  const updateTime = timeNow.setHours(timeNow.getHours() + 48)

  return { hash, createTime, updateTime }
}


module.exports = hashFunc;
