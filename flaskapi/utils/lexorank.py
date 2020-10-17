def rank(prev_str, next_str):
  def build_symbols():
    segments = [
      ('0', '9'),
      ('A', 'Z'),
      ('a', 'z')
    ]

    acc = ""
    for s in segments:
      start, end = s
      for c in range(ord(start), ord(end) + 1):
        symbol = chr(c)
        acc += symbol

    return(acc)

  def getChar(s, i, default_char):
    if i >= len(s):
      return default_char
    return(s[i])

  symbols = build_symbols()
 
  min_char = symbols[0]
  max_char = symbols[-1]

  if prev_str == "":
    prev_str = min_char
  if next_str == "":
    next_str = max_char

  i = 0
  rank_str = ""
  while True:
    prev_char = getChar(prev_str, i, min_char)
    next_char = getChar(next_str, i, max_char)

    if prev_char == next_char:
      rank_str += prev_char
      i += 1
      continue

    prev_char_index = symbols.index(prev_char)
    next_char_index = symbols.index(next_char)
    middle_char_index = (prev_char_index + next_char_index) // 2
    mid_char = symbols[middle_char_index]

    if mid_char == prev_char or mid_char == next_char:
      rank_str += prev_char
      i += 1
      continue

    rank_str += mid_char
    break
  return(rank_str)

if __name__ == "main":
  assert(rank('', '') == 'U')
  assert(rank('', '2') == '1')
  assert(rank('x', '') == 'y')
  assert(rank('a', 'c') == 'b')
  assert(rank('az', 'b') == 'azU')
  assert(rank('aaaa', 'aaac') == 'aaab')
  assert(rank('aaaa', 'aaab') == 'aaaaU')
