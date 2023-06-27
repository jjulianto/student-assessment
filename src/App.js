import { useState } from 'react'
import profile from './profile.jpg'
import './App.css'

function App() {
  const gradeValue = Array.from({ length: 10 }, (_, i) => i + 1)

  const [grade, setGrade] = useState(() => {
    const initialState = {
      aspek_penilaian_1: {},
      aspek_penilaian_2: {},
      aspek_penilaian_3: {},
      aspek_penilaian_4: {}
    }

    gradeValue.forEach((mahasiswa) => {
      const mahasiswaKey = `mahasiswa_${mahasiswa}`
      Object.keys(initialState).forEach((aspek) => {
        initialState[aspek][mahasiswaKey] = 1
      })
    })

    return initialState
  })

  const handleGradeChange = (aspek, mahasiswa, value) => {
    setGrade((prevState) => ({
      ...prevState,
      [aspek]: {
        ...prevState[aspek],
        [mahasiswa]: parseInt(value)
      }
    }))
  }

  const handleSave = () => {
    const jsonData = JSON.stringify(grade, null, 2)

    const blob = new Blob([jsonData], { type: 'application/json' })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'grade.json'
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className='wrapper'>
      <p className='header-text'>Aplikasi Penilaian Mahasiswa</p>
      <div className='card' style={{ border: 'none', marginBottom: '0' }}>
        <div className='card-body'>
          <div></div>
          <div className='card-grade'>
            {Object.keys(grade).map((item, index) => (
              <p className='card-name' style={{ width: '25%' }} key={item}>
                Aspek <br /> Penilaian {index + 1}
              </p>
            ))}
          </div>
        </div>
      </div>
      {gradeValue.map((mahasiswa) => (
        <div className='card' key={mahasiswa}>
          <div className='card-body'>
            <div className='card-title'>
              <img src={profile} alt='Avatar' className='avatar' />
              <p className='card-name'>Mahasiswa {mahasiswa}</p>
            </div>
            <div className='card-grade'>
              {Object.keys(grade).map((aspek) => (
                <select
                  className='grade'
                  key={aspek}
                  onChange={(e) =>
                    handleGradeChange(
                      aspek,
                      `mahasiswa_${mahasiswa}`,
                      e.target.value
                    )
                  }
                  value={grade[aspek][`mahasiswa_${mahasiswa}`] || ''}
                >
                  {gradeValue.map((selectItem) => (
                    <option value={selectItem} key={selectItem}>
                      {selectItem}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className='footer'>
        <button className='btn btn-submit' type='button' onClick={handleSave}>
          Simpan
        </button>
      </div>
    </div>
  )
}

export default App
