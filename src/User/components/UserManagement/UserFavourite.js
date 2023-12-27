//Bộ sưu tập của người dùng
import React from 'react'
import List from './../Home/List'

function UserFavourite() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ marginBottom: '10px', color: '#ee0000' }}>Danh sách phát</h1>
      <List/>
    </div>
  )
}

export default UserFavourite