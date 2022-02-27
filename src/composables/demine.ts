import { Block } from '~/types'

const mineRatio = 0.15625

export function initDemine(rows: number, cols: number) {
  const size = rows * cols
  let mines = Math.floor(size * mineRatio)
  let revealedBlocks = 0

  const status = ref<'playing' | 'won' | 'lost'>('playing')

  const blocks = ref<Block[]>(
    new Array(size).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      isEmpty: true,
      mineCount: 0,
    }))
  )

  while (mines > 0) {
    const index = Math.floor(Math.random() * size)

    if (blocks.value[index].isEmpty) {
      blocks.value[index].isMine = true
      blocks.value[index].isEmpty = false

      const neighbors = getNeighborsIndex(index, cols)
      neighbors.forEach((neighbor) => {
        blocks.value[neighbor].mineCount++
      })

      mines--
    }
  }

  function openBlock(index: number) {
    const _blocks: Block[] = blocks.value

    if (_blocks[index].isRevealed || _blocks[index].isFlagged) {
      return
    }

    if (_blocks[index].isMine) {
      status.value = 'lost'
      _blocks.forEach((block) => block.isMine && (block.isRevealed = true))
      return
    }

    if (_blocks[index].mineCount === 0) {
      _blocks[index].isRevealed = true
      const neighbors = getNeighborsIndex(index, cols)
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

    const _blocks: Block[] = blocks.value

    if (_blocks[index].isRevealed) {
      return
    }

    _blocks[index].isFlagged = !_blocks[index].isFlagged
  }

  print(blocks.value)

  return {
    blocks,
    status,
    openBlock,
    flagBlock,
  }
}

function getY(index: number, size: number) {
  return Math.floor(index / size)
}

function getX(index: number, size: number) {
  return index % size
}

function getNeighborsIndex(index: number, size: number) {
  const y = getY(index, size)
  const x = getX(index, size)

  const coordinates = [
    { y: y - 1, x: x - 1 },
    { y: y - 1, x: x },
    { y: y - 1, x: x + 1 },
    { y: y, x: x - 1 },
    { y: y, x: x + 1 },
    { y: y + 1, x: x - 1 },
    { y: y + 1, x: x },
    { y: y + 1, x: x + 1 },
  ].filter(({ y, x }) => y >= 0 && y < size && x >= 0 && x < size)

  return coordinates.map(({ y, x }) => y * size + x)
}

function print(blocks: Block[]) {
  const size = Math.sqrt(blocks.length)
  const rows = blocks.reduce((rows: string[][], block, index) => {
    const y = getY(index, size)
    const x = getX(index, size)

    if (y === 0) {
      rows.push(new Array(size).fill(' '))
    }

    rows[y][x] = block.isMine ? '*' : String(block.mineCount)
    return rows
  }, [])

  rows.forEach((row) => {
    console.log(row.join(' '))
  }, [])
}
