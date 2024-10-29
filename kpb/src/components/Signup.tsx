import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Signup() {
  return (
    <div className="max-h-screen flex items-center justify-center m-4  border-2 border-black">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-[#13213e] mb-6">
            Create Your Account
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-[#13213e] font-semibold"
                >
                  First Name
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  className="mt-1 block w-full border-gray-300 focus:border-[#ffbd59] focus:ring focus:ring-[#ffbd59] focus:ring-opacity-50 text-[#13213e]"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-[#13213e] font-semibold"
                >
                  Last Name
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                  className="mt-1 block w-full border-gray-300 focus:border-[#ffbd59] focus:ring focus:ring-[#ffbd59] focus:ring-opacity-50 text-[#13213e]"
                  required
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="address1"
                className="text-[#13213e] font-semibold"
              >
                Address 1
              </Label>
              <Textarea
                id="address1"
                placeholder="1234 Main St"
                className="mt-1 block w-full border-gray-300 focus:border-[#ffbd59] focus:ring focus:ring-[#ffbd59] focus:ring-opacity-50 text-[#13213e]"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="address2"
                className="text-[#13213e] font-semibold"
              >
                Address 2{" "}
                <span className="text-gray-500 font-normal">(Optional)</span>
              </Label>
              <Textarea
                id="address2"
                placeholder="Apartment, studio, or floor"
                className="mt-1 block w-full border-gray-300 focus:border-[#ffbd59] focus:ring focus:ring-[#ffbd59] focus:ring-opacity-50 text-[#13213e]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="city" className="text-[#13213e] font-semibold">
                  City
                </Label>
                <Input
                  type="text"
                  id="city"
                  placeholder="New York"
                  className="mt-1 block w-full border-gray-300 focus:border-[#ffbd59] focus:ring focus:ring-[#ffbd59] focus:ring-opacity-50 text-[#13213e]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-[#13213e] font-semibold">
                  State
                </Label>
                <Select required>
                  <SelectTrigger
                    id="state"
                    className="mt-1 w-full border-gray-300 focus:border-[#ffbd59] focus:ring focus:ring-[#ffbd59] focus:ring-opacity-50 text-[#13213e]"
                  >
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                    <SelectItem value="il">Illinois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="pincode"
                  className="text-[#13213e] font-semibold"
                >
                  Pincode
                </Label>
                <Input
                  type="text"
                  id="pincode"
                  placeholder="12345"
                  className="mt-1 block w-full border-gray-300 focus:border-[#ffbd59] focus:ring focus:ring-[#ffbd59] focus:ring-opacity-50 text-[#13213e]"
                  required
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="mobileNumber"
                className="text-[#13213e] font-semibold"
              >
                Mobile Number
              </Label>
              <Input
                type="tel"
                id="mobileNumber"
                placeholder="(123) 456-7890"
                className="mt-1 block w-full border-gray-300 focus:border-[#ffbd59] focus:ring focus:ring-[#ffbd59] focus:ring-opacity-50 text-[#13213e]"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-[#13213e] font-semibold">
                Email{" "}
                <span className="text-gray-500 font-normal">(Optional)</span>
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                className="mt-1 block w-full border-gray-300 focus:border-[#ffbd59] focus:ring focus:ring-[#ffbd59] focus:ring-opacity-50 text-[#13213e]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#13213e] text-[#ffbd59] hover:bg-[#13213e]/90 text-lg py-6 rounded-lg"
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
