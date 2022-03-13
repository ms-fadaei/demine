import { Block } from '~/types'
import { ref } from 'vue'

const mineRatio = 0.15625

export function initDemine(rows: number, cols: number) {
  const size = rows * cols
  const minesCount = Math.floor(size * mineRatio)
  let revealedBlocksCount = 0
  let gameInitiated = false

  const status = ref<'playing' | 'won' | 'lost'>('playing')
  const flagsCount = ref(0)
  const blocks = ref<Block[]>(
    [...Array(size)].map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      mineCount: 0,
      flagCount: 0,
    }))
  )

  // we need to init game based on the first chosen block
  // so we can considered it is empty
  function init(index: number) {
    let minesCountTracker = minesCount

    // get all neighbors of the chosen block (including the chosen block)
    // to avoid putting mine on them
    const firstBlockNeighbors = getNeighborsIndex(index, rows, cols)
    firstBlockNeighbors.push(index)

    while (minesCountTracker > 0) {
      const index = Math.floor(Math.random() * size)

      if (!firstBlockNeighbors.includes(index) && !blocks.value[index].isMine) {
        blocks.value[index].isMine = true

        const neighbors = getNeighborsIndex(index, rows, cols)
        neighbors.forEach((neighbor) => {
          blocks.value[neighbor].mineCount++
        })

        minesCountTracker--
      }
    }

    gameInitiated = true
  }

  function open(index: number) {
    const targetBlock = blocks.value[index]

    if (targetBlock.isRevealed || targetBlock.isFlagged) return

    // init game for first chosen block
    if (!gameInitiated) init(index)

    if (targetBlock.isMine) {
      status.value = 'lost'
      blocks.value.filter((b) => b.isMine || b.isFlagged).forEach((b) => (b.isRevealed = true))
      return
    }

    targetBlock.isRevealed = true

    if (targetBlock.mineCount === 0) {
      const neighbors = getNeighborsIndex(index, rows, cols)
      neighbors.forEach((neighbor) => open(neighbor))
    }

    if (++revealedBlocksCount === size - minesCount) {
      status.value = 'won'
    }
  }

  function flag(index: number) {
    const targetBlock = blocks.value[index]

    if (targetBlock.isRevealed) return
    if (!targetBlock.isFlagged && flagsCount.value === minesCount) return

    const addFlagCount = targetBlock.isFlagged ? -1 : +1
    targetBlock.isFlagged = !targetBlock.isFlagged
    flagsCount.value += addFlagCount

    const neighbors = getNeighborsIndex(index, rows, cols)
    neighbors.forEach((neighbor) => (blocks.value[neighbor].flagCount += addFlagCount))
  }

  function openNeighbours(index: number) {
    const targetBlock = blocks.value[index]

    if (!targetBlock.isRevealed) return
    if (targetBlock.flagCount !== targetBlock.mineCount) return

    const neighbors = getNeighborsIndex(index, rows, cols)
    neighbors
      .filter((neighbor) => !blocks.value[neighbor].isRevealed || !blocks.value[neighbor].isFlagged)
      .forEach(open)
  }

  return {
    blocks,
    status,
    minesCount,
    flagsCount,
    open,
    flag,
    openNeighbours,
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
