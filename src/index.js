module.exports = function check(str, bracketsConfig) {
  const openBrackets = []
  const closeBrackets = []
  const trigger = []
  const stack = []

  bracketsConfig.forEach((item) => {
    openBrackets.push(item[0])
    closeBrackets.push(item[1])
    
    if (item[0] === item[1]) {
      trigger.push(0)
    } else {
      trigger.push(1)
    }
  })

  if (str === '') {
    return true
  }

  len = str.length
  let position = 0
  
  for (let item = 0; item < len; item++) {
    
    if (str[item] !== ' ') {
      position = openBrackets.indexOf(str[item])
      
      if ( position > -1) {
        
        // if bracket is equal
        if (openBrackets[position] === closeBrackets[position]) {
          
          if (stack.length > 0) {
            
            // check brackets prev type with current type
            if (stack[stack.length-1] === str[item]) {
              stack.pop()
              trigger[position]--;
              
              if (trigger[position] < 0) {
                // error
                return false;
              }

            } else {
              // add equal bracket to stack
              stack.push(str[item])
              trigger[position]++;
            }

          } else {
            // add first open bracket to stack
            stack.push(str[item])
            trigger[position]++;
          }          

        } else {
          // add open bracket to stack
          stack.push(str[item])
        }

      } else {
        position = closeBrackets.indexOf(str[item])
        
        if ( position > -1) {
          
          if (stack.length > 0) {

            // check bracket prev type with current type
            if (openBrackets.indexOf(stack[stack.length-1]) === position) {
              // remove open brackets from stack, because current bracket is close
              stack.pop()
            } else {
              // error - incorrect brackets
              return false;
            }

          } else {
            // error - first bracket is close
            return false;
          }          
        }
      }
    }
  }

  if (stack.length > 0) {
    return false
  } else {
    return true
  }
}
