import { Block } from '~/types'
import { ref } from 'vue'

const mineRatio = 0.15625

export function initDemine(rows: number, cols: number) {
  const size = rows * cols
  const mines = Math.floor(size * mineRatio)
  let revealedBlocks = 0
  let initiated = false

  const status = ref<'playing' | 'won' | 'lost'>('playing')
  const flagsCount = ref(0)

  const blocks = ref<Block[]>(
    new Array(size).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      mineCount: 0,
    }))
  )

  function init(index: number) {
    let minesTemp = mines
    const firstBlockNeighbors = getNeighborsIndex(index, rows, cols)
    firstBlockNeighbors.push(index)

    while (minesTemp > 0) {
      const index = Math.floor(Math.random() * size)

      if (!firstBlockNeighbors.includes(index) && !blocks.value[index].isMine) {
        blocks.value[index].isMine = true

        const neighbors = getNeighborsIndex(index, rows, cols)
        neighbors.forEach((neighbor) => {
          blocks.value[neighbor].mineCount++
        })

        minesTemp--
      }
    }

    initiated = true
  }

  function openBlock(index: number) {
    const _blocks = blocks.value

    if (!initiated) init(index)

    if (_blocks[index].isRevealed || _blocks[index].isFlagged) return

    if (_blocks[index].isMine) {
      status.value = 'lost'
      _blocks.forEach((block) => (block.isMine || block.isFlagged) && (block.isRevealed = true))
      return
    }

    if (_blocks[index].mineCount === 0) {
      _blocks[index].isRevealed = true
      const neighbors = getNeighborsIndex(index, rows, cols)
      neighbors.forEach((neighbor) => openBlock(neighbor))
    } else {
      _blocks[index].isRevealed = true
    }

    if (++revealedBlocks === size - mines) {
      status.value = 'won'
    }
  }

  function flagBlock(e: Event, index: number) {
    e.preventDefault()

    const _blocks = blocks.value

    if (_blocks[index].isRevealed) return
    if (!_blocks[index].isFlagged && flagsCount.value === mines) return

    flagsCount.value += _blocks[index].isFlagged ? -1 : 1
    _blocks[index].isFlagged = !_blocks[index].isFlagged
  }

  return {
    blocks,
    status,
    minesCount: mines,
    flagsCount,
    openBlock,
    flagBlock,
  }
}

function getY(index: number, cols: number) {
  return Math.floor(index / cols)
}

function getX(index: number, cols: number) {
  return index % cols
}

function getNeighborsIndex(index: number, rows: number, cols: number) {
  const y = getY(index, cols)
  const x = getX(index, cols)

  const coordinates = [
    { y: y - 1, x: x - 1 },
    { y: y - 1, x: x },
    { y: y - 1, x: x + 1 },
    { y: y, x: x - 1 },
    { y: y, x: x + 1 },
    { y: y + 1, x: x - 1 },
    { y: y + 1, x: x },
    { y: y + 1, x: x + 1 },
  ].filter(({ y, x }) => y >= 0 && y < rows && x >= 0 && x < cols)

  return coordinates.map(({ y, x }) => y * cols + x)
}
