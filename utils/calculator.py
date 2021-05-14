class Calculator:

    def __init__(self):
        pass

    def error(self):
        print("error")

    def find_next_closing_bracket_location(self, i, string):
        n = len(string)
        nb = 1
        pos = i + 1
        while pos < n:
            if string[pos] == '(':
                nb += 1
            elif string[pos] == ')':
                nb -= 1
                if nb == 0:
                    return pos
            pos += 1
        return -1

    def find_digit_end_location(self, i, string):
        n = len(string)
        j = i+1
        while j < n and string[j].isdigit():
            j += 1
        return j-1

    def calculate(self, string):
        if not string:
            return 0
        n = len(string)
        # (77+3)/(16-12)+2*101 = 222
        i = 0
        sign = '+'
        stack = []
        while i < n:
            num = 0

            if string[i] in '+-*/':
                sign = string[i]
                i += 1
                continue
            if string[i] == '(':
                j = self.find_next_closing_bracket_location(i, string)
                if j == -1:
                    self.error()
                    return
                new_string = string[i+1:j]
                num = self.calculate(new_string)
                i = j + 1
            elif string[i].isdigit():
                j = self.find_digit_end_location(i, string)
                num = int(string[i:j+1])
                i = j + 1

            if sign in '+-':
                stack.append(num * (1 if sign == '+' else -1))
            elif sign == '*':
                if stack:
                    mul = stack.pop() * num
                    stack.append(mul)
                else:
                    self.error()
                    return "invalid"

            elif sign == '/':
                if stack:
                    div = stack.pop() // num
                    stack.append(div)
                else:
                    self.error()
                    return "invalid"
        # print(stack)
        return sum(stack)


if __name__ == '__main__':
    calculator = Calculator()
    test_input_1 = "(77+3)/(16-12)+2*101"
    test_input_2 = "21*(1+2)+3+4"
    res = calculator.calculate(test_input_2)
    print(test_input_2, "=", res)
